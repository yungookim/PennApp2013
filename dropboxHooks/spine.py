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

sess = session.DropboxSession(app_key, app_secret, access_type)
request_token = sess.obtain_request_token()

class Index:
	def GET(self):
		print "using", app_key, app_secret, access_type
 			
		if not sess.is_linked():
			url = sess.build_authorize_url(request_token, 'http://simplyi.me:3000/allowed')
			raise web.seeother(url)
		else:
			return 'Well... okay...'

class Allowed:
	def GET(self):
		access_token = sess.obtain_access_token(request_token)
		allowed_client = client.DropboxClient(sess)
		print access_token.key, access_token.secret
		
		# mongo work here
		connection = MongoClient()
		
		db = connection.simplyime
		
		post = allowed_client.account_info()
		info_datum = db.posts
		oid = info_datum.insert(post)
		#new_url = 'http://simplyi.me:3000/allowed?ObjectId=' + str(oid) 

		#raise web.seeother(new_url)		
		return oid
		

if __name__ == "__main__":
	app = web.application(urls, globals())
	app.run()
