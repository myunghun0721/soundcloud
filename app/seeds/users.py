from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    alice = User(
        username='alice', email='alice@aa.io', password='password1')
    ben = User(
        username='ben', email='ben@aa.io', password='password2')
    carol = User(
        username='carol', email='carol@aa.io', password='password3')
    david = User(
        username='david', email='david@aa.io', password='password4')
    eva = User(
        username='eva', email='eva@aa.io', password='password5')
    frank = User(
        username='frank', email='frank@aa.io', password='password6')
    grace = User(
        username='grace', email='grace@aa.io', password='password7')
    henry= User(
        username='henry', email='henry@aa.io', password='password8')
    isla = User(
        username='isla', email='isla@aa.io', password='password9')
    jake = User(
        username='jake', email='jake@aa.io', password='password10')
    kate = User(
        username='kate', email='kate@aa.io', password='password11')
    lucas = User(
        username='lucas', email='lucas@aa.io', password='password12')
    

    
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add_all([alice,ben,carol, david, eva, frank, grace, henry, isla, jake, kate, lucas])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
