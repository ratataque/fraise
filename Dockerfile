FROM python:3.10


RUN python -m pip install django djangorestframework

RUN mkdir /fraise
COPY backend /fraise/backend
COPY frontend /fraise/frontend

WORKDIR /fraise/backend

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]

# CMD ["bash"]	