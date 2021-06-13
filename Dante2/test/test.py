#!C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Python 3.7
print("Connect-type: text/html\n\n")

import cgi


form = cgi.FieldStorage
email = str(form.getvalue("email"))


print(f"<h1> {email} <\h1>")