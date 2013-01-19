import web
from dropbox import client, rest, session
import time, oauth
from pymongo import Connection, MongoClient

# key, secret, access_type
app_key = '6tqpoonhurv29mz'
app_secret = 'gepizvnxzc0brtn'
access_type = 'app_folder'
# urls for internal use
urls = (
	'/', 'Index',
	'/allowed', 'Allowed'
)

# since we will use dropbox wholely anyways
sess = session.DropboxSession(app_key, app_secret, access_type)
request_token = sess.obtain_request_token()

class Index:
	def GET(self):
		# check if the session is linked yet,
		#if not sess.is_linked():
		callback='http://simplyi.me:3000/allowed'
		url = sess.build_authorize_url(request_token, callback)
		raise web.seeother(url) # if it isn't linked yet, then redirect to authentication page

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

		#check mongo, if it is already there;
		try:
			selectall = collection.find_one({"uid": userdata['uid']})
			# then we update,
			for key,value in userdata.items():
				if not (value == selectall[key]):
					print "update", value
					collection.update({key:value}, {key:userdata[key]})
			oid = selectall["_id"]

		except: # not there, then add new
			print "addnew", userdata['email']
			oid = collection.insert(userdata)
			
		raise web.seeother('http://simplyi.me:3030/authenticated?ObjectID=' + str(oid))




if __name__ == "__main__":
	app = web.application(urls, globals())
	app.run()
