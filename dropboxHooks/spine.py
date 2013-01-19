import web
from dropbox import client, rest, session
import time, oauth
from pymongo import Connection, MongoClient

app_key = '6tqpoonhurv29mz'
app_secret = 'gepizvnxzc0brtn'
access_type = 'app_folder'

urls = (
	'/', 'Index',
	'/allowed', 'Allowed'
)

oid = ''

sess = session.DropboxSession(app_key, app_secret, access_type)
request_token = sess.obtain_request_token()

class Index:
	def GET(self):
		print "using", app_key, app_secret, access_type
 			
		if not sess.is_linked():
			callback='http://simplyi.me:3000/allowed'
			url = sess.build_authorize_url(request_token, callback)
			raise web.seeother(url)
		else:
			access_token = sess.obtain_access_token(request_token)
			allowed_slient = client.DropboxClient(sess)
			# dropbox account data
			userdata = allowed_slient.account_info()
			uid = userdata['uid']
				
			# mongo preset
			connection = Connection()
			db = connection.simplyime
			collection = db.user

			# check mongo if there's anything already exists,
			# if so, then we update.
			print uid
			selectall =collection.find_one({"uid": uid})	
			
			for key,value in selectall.items():
				print key,value			

			# if not, then well.			

			#raise web.seeother('http://simplyi.me/allowed')


class Allowed:
	def GET(self):
		access_token = sess.obtain_access_token(request_token)
                allowed_client = client.DropboxClient(sess)
		#collect dropbox account
                userdata = allowed_client.account_info()
                
		# mongo work here
                connection = Connection()
                db = connection.simplyime
		collection = db.user

                oid = collection.insert(userdata)
		print oid
		#raise web.seeother('http://simplyi.me/allowed?ObjectId=' + str(oid))
		raise web.seeother('/')

if __name__ == "__main__":
	app = web.application(urls, globals())
	app.run()
