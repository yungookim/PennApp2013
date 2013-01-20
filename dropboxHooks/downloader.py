from dropbox import client, rest, session
from pymongo import Connection, MongoClient
import os
import web

def start(folder_metadata, allowed_client, userdata, oid):
	connection = Connection()
	db = connection.simplyime		
	collection = db.user	

	loaded,newfiles = file_downloader(folder_metadata, allowed_client, userdata, collection)
	collection.update({'uid':userdata['uid']},{"$set":{"files":newfiles}})
	if loaded:
		raise web.seeother('http://simplyi.me:3030/authenticated?ObjectID=' + str(oid))

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
    
    return True,newfiles
