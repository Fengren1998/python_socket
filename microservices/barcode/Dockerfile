FROM python:3.7

LABEL author="mikhail.agudo@gmail.com"

WORKDIR /app

COPY . /app

RUN pip install -r requirements.txt

ENTRYPOINT ["python"]

CMD ["python", "app.py"]
