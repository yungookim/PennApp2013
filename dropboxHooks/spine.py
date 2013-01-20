import web
from dropbox import client, rest, session
import os, time, oauth
from pymongo import Connection, MongoClient
import downloader

app_key = '6tqpoonhurv29mz'
app_secret = 'gepizvnxzc0brtn'
access_type = 'app_folder'
# urls for internal use
urls = (
	'/', 'Index',
	'/allowed', 'Allowed')

# since we will use dropbox wholely anyways
sess = session.DropboxSession(app_key, app_secret, access_type)
request_token = sess.obtain_request_token()

class Index:
	def GET(self):
		#since we will use dropbox wholely anyways
		# check if the session is linked yet,
		callback='http://simplyi.me:3000/allowed'
		url = sess.build_authorize_url(request_token, callback)
		raise web.seeother(url) # if it isn't linked yet, then redirect to authentication page

class Allowed:
	def GET(self):
		
		access_token = sess.obtain_access_token(request_token)
        	allowed_client = client.DropboxClient(sess)
		
		#1: get dropbox account info.
               	userdata = allowed_client.account_info()

		#preset for mongo
		connection = Connection()
		db = connection.simplyime		

		#2: save the user info
                collection = db.user
		try:    #check if the userinfo is already there.
			selectall = collection.find_one({"uid": userdata['uid']})
                       	#then we update,
                       	for key,value in userdata.items():
				if not(value == selectall[key]):
					collection.update({key:value}, {key:userdata[key]})
			oid = selectall["_id"]
		except: #if not there, then add new user info
			emptyjson = {}
			for key,value in userdata.items():
				emptyjson[key]=value
				emptyjson["oauth_token"]=access_token.key
				emptyjson["oauth_secret"]=access_token.secret
				emptyjson["files"]=[]
			oid = collection.insert(emptyjson)

		#3: get the metadata.
		folder_metadata = allowed_client.metadata('/')
		print "starting downloading...."
		downloader.start(folder_metadata, allowed_client, userdata, oid)
		
if __name__ == "__main__":
	app = web.application(urls, globals())
	app.run()

