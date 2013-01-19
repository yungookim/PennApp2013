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
		print "using", app_key, app_secret, access_type
 		
		# check if the session is linked yet,
		if not sess.is_linked():
			callback='http://simplyi.me:3000/allowed'
			url = sess.build_authorize_url(request_token, callback)
			raise web.seeother(url) # if it isn't linked yet, then redirect to authentication page
		else:
			access_token=sess.obtain_access_token(request_token)
			allowed_client = client.DropboxClient(sess)
			# dropbox account data
			userdata = allowed_client.account_info()
			uid = userdata['uid']
				
			# mongo preset
			connection = Connection()
			db = connection.simplyime
			collection = db.user

			# check mongo if there's anything already exists,
			# if so, then we update.
			selectall = collection.find_one({"uid": uid})
			
			for key,value in userdata.items():
				# if the value is the same, leave it
				if value == userdata[key]:
					print "same", value, userdata[key]
				else: # if the value isn't the same, then update
					print "update"
					collection.update({key:value}, {key:userdata[key]})
			
			oid = selectall["_id"]
	
			raise web.seeother('http://simplyi.me:3030/authenticated?ObjectID=' + str(oid))
			

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
				if not(value == userdata[key]):
					print "update"
					collection.update({key:value}, {key:userdata[key]})
			oid = selectall["_id"]

		except: # not there, then add new
			print "add new"
			oid = collection.insert(userdata)
			
		# see how the directory structure looks like, i.e. what's in there?		
		#folder_metadata = allowed_client.metadata('/')
		#print "metadata:", folder_metadata
		
		"""
		# what are the files?
		f, metadata = client.get_file_and_metadata('/magnum-opus.txt')
		out = open('magnum-opus.txt', 'w')
		out.write(f.read())
		out.close()
		print(metadata)

		# Once we have the file downloaded, then we save the directory (local) indo mongodb 

		"""

		raise web.seeother('http://simplyi.me:3030/authenticated?ObjectID=' + str(oid))
		

if __name__ == "__main__":
	app = web.application(urls, globals())
	app.run()
