FROM python:3.10


RUN python -m pip install django djangorestframework psycopg2-binary requests djangorestframework-simplejwt

RUN mkdir /fraise
COPY backend /fraise/backend
COPY frontend /fraise/frontend

WORKDIR /fraise/backend

# RUN python manage.py makemigrations
# RUN python manage.py migrate
# CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]

# CMD ["bash"]	