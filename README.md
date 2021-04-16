# FakeShop

Fake E-commerce build for learn React-js, the UI is nothing fancy but cart and user logic works
and that's enough for me. 

Use Django, django-rest-framework as a back-end.

This project is ship with: database, products photo, secret-key and debug enabled
because is a fake project and will never go online.

To have a look to it you need to have npm installed, then...
```
git clone https://github.com/deviare/FakeShop.git
cd FakeShop
python3 -m venv venv
source venv/bin/activate
pip3 install -r requirements.txt
cd frontend
npm install
npm run build
cd ..
python3 manage.py runserver

# Open http://127.0.0.1:8000/ in your browser
```

If you want to have a look to the admin page, for maybe add some product, you will need a super user
```
python3 manage.py createsuperuser

# Open http://127.0.0.1:8000/admin in your browser
```





