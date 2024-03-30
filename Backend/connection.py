from peewee import *;

bd = PostgresqlDatabase('gymworkout', port = 5432, user = 'postgres', password = '121427')

class BaseModel(Model):
    class Meta():
        database = bd

class Personal(BaseModel):
    id = AutoField()
    name = CharField(max_length=50)
    email = CharField(max_length=50)
    password = CharField(max_length=50)
    phone = CharField(max_length=11)


bd.connect()
# bd.create_tables([Personal])
bd.close()