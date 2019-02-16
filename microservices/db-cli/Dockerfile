FROM python:3.7

LABEL author="levymedina3@gmail.com"

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

ENV FLASK_RUN_PORT=5001

ENV FLASK_APP=app.py

ENV FLASK_ENV=development

RUN pip install -r requirements.txt

COPY . /app

ENTRYPOINT ["python"]

CMD ["app.py"]
