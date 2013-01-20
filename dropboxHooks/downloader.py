import web
from dropbox import client, rest, session
import time, oauth
from pymongo import Connection, MongoClient
import os

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

def start():
	access_token = sess.obtain_access_token(request_token)
        allowed_client = client.DropboxClient(sess)	
        userdata = allowed_client.account_info()

	connection = Connection()
	db = connection.simplyime		
        collection = db.user

	selectall = collection.find_one({"uid": userdata['uid']})

	print selectall

	"""
	folder_metadata = allowed_client.metadata('/')
	newfiles = file_downloader(folder_metadata, allowed_client, userdata, collection)
	collection.update({'uid':userdata['uid']},{"$set":{"files":newfiles}})
	"""

#this will download file.
def file_downloader(folder_metadata, allowed_client, userdata, collection):
    newfiles=[]
    counter = 0
    
    for i in folder_metadata['contents']:
        filename = i['path']
        f, metadata = allowed_client.get_file_and_metadata(filename)
        
        directory = '/data/' + str(userdata['uid'])
        if not os.path.exists(directory):
            os.makedirs(directory)
        filedir = directory+"/"+filename[1:]
    
        out = open(filedir,'w')
        out.write(f.read())
        out.close()
    
        prevfiles = collection.find({"uid":userdata['uid']},{"files":1})
        newkey = str(userdata['uid'])+str(counter)
        newfiles.append({"uuid":newkey,"dir": filedir})
        counter +=1
    
    return newfiles

if __name__ == "__main__":
	start()
