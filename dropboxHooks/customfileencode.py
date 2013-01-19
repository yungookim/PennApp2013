from bson.binary import Binary
from pymongo.son_manipulator import SONManipulator

class Custom(object):
	def __init__(self,x):
		self.__x = x
	def x(self):
		return self.__x

def to_binary(custom):
	return Binary(str(custom.x()), 128)

def from_binary(binary):
	return Custom(int(binary))

class TransformToBinary(SONManipulator):
	def transform_incoming(self,son,collection):
		for (key, value) in son.items():
			if isinstance(value,Custom):
				son[key] = to_binary(value)
			elif isinstance(value,dict):
				son[key] = self.transform_incoming(value,collection)
		return son

	def transform_outgoing(self,son,collection):
		for (key, value) in son.items():
			if isinstance(value, Binary) and value.subtype == 128:
				son[key] = from_binary(value)
			elif isinstance(value, dict):
				son[key] = self.transform_outgoing(value, collection)
		return son



