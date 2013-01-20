import web
from dropbox import client, rest, session
import time, oauth
from pymongo import Connection, MongoClient
import os

import downloader

# key, secret, access_type
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
					print "update", value
					collection.update({key:value}, {key:userdata[key]})
			oid = selectall["_id"]
		except: #if not there, then add new user info
			print "add new", userdata['email']
			emptyjson = {}
			for key,value in userdata.items():
				emptyjson[key]=value
			emptyjson["oauth_token"]=access_token.key
			emptyjson["oauth_secret"]=access_token.secret
			emptyjson["files"]=[]
			oid = collection.insert(emptyjson)

		#3: get the metadata.
		folder_metadata = allowed_client.metadata('/')
		
		downloader.start(folder_metadata, allowed_client, userdata, oid)
		return "oh"
		
		#raise web.seeother('http://simplyi.me/authenticated?ObjectID=' + str(oid))		
"""
def download_files(folder_metadata, allowed_client,collection,userdata):
	newfiles=[]
	counter = 0
	for i in folder_metadata['contents']:
		#4: get the file.
		filename = i['path']
		f, metadata = allowed_client.get_file_and_metadata(filename)
		### we will save the files under root\data\UUID\files
        	# if not, we create and add.
		directory = '/data/' + str(userdata['uid'])
		if not os.path.exists(directory):
			os.makedirs(directory)
                filedir = directory+"/"+filename[1:]
                out = open(filedir,'w')
                out.write(f.read())
                out.close()
                #5: save them to mongo
                prevfiles = collection.find({"uid":userdata['uid']},{"files":1})
                newkey = str(userdata['uid'])+str(counter)
                newfiles.append({"uuid":newkey,"dir": filedir})
                counter +=1

	return True,newfiles
"""

if __name__ == "__main__":
	app = web.application(urls, globals())
	app.run()

