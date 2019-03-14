FROM python:3.7

LABEL author="mikhail.agudo@gmail.com"

ADD server.py .

COPY ./requirements.txt .

WORKDIR .

RUN pip install -r requirements.txt

CMD python3 server.py
