FROM python:3.7

LABEL author="mikhail.agudo@gmail.com"

ADD server.py ./

WORKDIR .

RUN pip install -r requirements.txt

CMD python3 server.py
