import pytesseract
import cv2
import matplotlib.pyplot as plt
import numpy as np
import json
import os
import re


# TO CLEAN TEXT (NB: I didn't right all of it so i dont understand it all)
def clean(text):
    text = (text.split("<poem>"))[1].split("</poem>")[0]
    text = text.replace("’", "'")
    text = text.replace("‘", "'")
    text = text.replace("”", "\"")
    # Remove row numbers
    text = re.sub('{{R\|[0-9]*}}', '', text, flags=re.IGNORECASE)

    # Remove annotations
    result = re.search('{{[^\|}]*\|[^\|}]*\|([^\|}]*)}}', text)

    if result != None:
        text = re.sub('{{[^\|}]*\|[^\|}]*\|([^\|}]*)}}', result.group(1), text)

    # Remove broken annotations
    text = re.sub('{{[^\|}]*\|[^\|}]*\|', '', text)

    # Remove markup
    text = re.sub('{{[^\|}]*\|[^\|}]*}}', '', text)

    # Remove square brackets annotations
    result = re.findall('\[\[[^\]]*\|([^\]]*)\]\]', text)

    if len(result) > 0:
        for r in result:
            text = re.sub('\[\[[^\]]*\|([^\]]*)\]\]', r, text, 1)

    return text.strip()


# Canti names to get their files
canti = ["Inferno/Canto I", "Inferno/Canto II", "Inferno/Canto III", "Inferno/Canto IV", "Inferno/Canto V",
         "Inferno/Canto VI", "Inferno/Canto VII", "Inferno/Canto VIII", "Inferno/Canto IX", "Inferno/Canto X",
         "Inferno/Canto XI", "Inferno/Canto XII", "Inferno/Canto XIII", "Inferno/Canto XIV", "Inferno/Canto XV",
         "Inferno/Canto XVI", "Inferno/Canto XVII", "Inferno/Canto XVIII", "Inferno/Canto XIX", "Inferno/Canto XX",
         "Inferno/Canto XXI", "Inferno/Canto XXII", "Inferno/Canto XXIII", "Inferno/Canto XXIV", "Inferno/Canto XXV",
         "Inferno/Canto XXVI", "Inferno/Canto XXVII", "Inferno/Canto XXVIII", "Inferno/Canto XXIX", "Inferno/Canto XXX",
         "Inferno/Canto XXXI", "Inferno/Canto XXXII", "Inferno/Canto XXXIII", "Inferno/Canto XXXIV",
         "Purgatorio/Canto I", "Purgatorio/Canto II", "Purgatorio/Canto III", "Purgatorio/Canto IV",
         "Purgatorio/Canto V", "Purgatorio/Canto VI", "Purgatorio/Canto VII", "Purgatorio/Canto VIII",
         "Purgatorio/Canto IX", "Purgatorio/Canto X", "Purgatorio/Canto XI", "Purgatorio/Canto XII",
         "Purgatorio/Canto XIII", "Purgatorio/Canto XIV", "Purgatorio/Canto XV", "Purgatorio/Canto XVI",
         "Purgatorio/Canto XVII", "Purgatorio/Canto XVIII", "Purgatorio/Canto XIX", "Purgatorio/Canto XX",
         "Purgatorio/Canto XXI", "Purgatorio/Canto XXII", "Purgatorio/Canto XXIII", "Purgatorio/Canto XXIV",
         "Purgatorio/Canto XXV", "Purgatorio/Canto XXVI", "Purgatorio/Canto XXVII", "Purgatorio/Canto XXVIII",
         "Purgatorio/Canto XXIX", "Purgatorio/Canto XXX", "Purgatorio/Canto XXXI", "Purgatorio/Canto XXXII",
         "Purgatorio/Canto XXXIII", "Paradiso/Canto I", "Paradiso/Canto II", "Paradiso/Canto III", "Paradiso/Canto IV",
         "Paradiso/Canto V", "Paradiso/Canto VI", "Paradiso/Canto VII", "Paradiso/Canto VIII", "Paradiso/Canto IX",
         "Paradiso/Canto X", "Paradiso/Canto XI", "Paradiso/Canto XII", "Paradiso/Canto XIII", "Paradiso/Canto XIV",
         "Paradiso/Canto XV", "Paradiso/Canto XVI", "Paradiso/Canto XVII", "Paradiso/Canto XVIII", "Paradiso/Canto XIX",
         "Paradiso/Canto XX", "Paradiso/Canto XXI", "Paradiso/Canto XXII", "Paradiso/Canto XXIII",
         "Paradiso/Canto XXIV", "Paradiso/Canto XXV", "Paradiso/Canto XXVI", "Paradiso/Canto XXVII",
         "Paradiso/Canto XXVIII", "Paradiso/Canto XXIX", "Paradiso/Canto XXX", "Paradiso/Canto XXXI",
         "Paradiso/Canto XXXII", "Paradiso/Canto XXXIII"]

# CONPUTER VISION AND TESSERACT
# pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

# Put image directory
img = cv2.imread("Capture.PNG")
img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
kernel = np.ones((1, 1), np.uint8)
img = cv2.dilate(img, kernel, iterations=1)
img = cv2.erode(img, kernel, iterations=1)
img = cv2.resize(img, None, fx=1.2, fy=1.2, interpolation=cv2.INTER_CUBIC)
text = pytesseract.image_to_string(img, lang='ita')
text = text.replace("’", "'").strip().replace("‘", "'").replace("”", "\"")
text_list = []
text_list.append(text)

# GET THE FIRST LINE IN CASE OF AN INPUT OF MANY LINES
if '\n' in text:
    text_list = text.splitlines()

print(text_list)


# INTIALIZING
canti_formated = []

remove_chars = ["/", " "]
# I FEEL that the folowing code is useless so I COMMENTED IT OUT

# REFORMATTING CANTI NAMES TO OPEN THEIR FILES
# for canto in canti:
#     for char in remove_chars:
#         canto = canto.replace(char, "_")
#     canti_formated.append(canto)

# page_counter to access data of the JSON file (DONT CHANGE PLS)
# page_counter = 1352

# SEARCH ENTERING MANY LINES AND RETURNING ONLY THE CANTICA AND CANTO INFORMATIONS ONLY (ex: Purgatorio_Canto_XIX)

# for canto in canti_formated:
#     file_canti = open("./data/"+canto + ".json", "r")
#     data = json.load(file_canti)
#     clean_text = clean(data['query']['pages'][str(page_counter)]['revisions'][0]['*'])
#
#     if page_counter == 1352:
#         page_counter = page_counter + 2
#     elif page_counter == 1419:
#         page_counter = 1463
#     else:
#         page_counter = page_counter + 1
#     file_canti.close()


# TO SHOW THE INPUT IMAGE (NB: can be commented if u want)
# plt.imshow(img, cmap='gray')
# plt.show()


# SEARCH ONLY BY VERSO RETURNINIG ALL INFORMATIONS

# Cleaning text
for i in range(len(text_list)):
    text_list[i] = text_list[i].replace("’", "'").strip().replace("‘", "'").replace("”", "\"")

divina_json = open("./data/divina_commedia.json", "r")
divina = json.load(divina_json)
info = divina['children']

# Initializing lists
num_riga = []
num_terzine = []

for cantica in info:
    for canto in cantica['children']:
        for terzine in canto['children']:
            for riga in terzine['children']:
                riga['text'] = riga['text'].replace("’", "'").strip().replace("‘", "'").replace("”", "\"")

                if text_list[0] in riga['text']:
                    print("Cantica:", cantica['name'])
                    print(canto['name'])
                    num_riga.append(riga['number'])
                    num_terzine.append(terzine['number'])
                if text_list[-1] in riga['text'] and len(text_list) > 1:
                    num_riga.append(riga['number'])
                    num_terzine.append(terzine['number'])

# Calculate the number of riga and formatting it to letters
for i in range(len(num_riga)):
    num_riga[i] = num_riga[i]%3
    if num_riga[i] == 0:
        num_riga[i] = 3
    if num_riga[i] == 1:
        num_riga[i] = "Prima"
    if num_riga[i] == 2:
        num_riga[i] = "Seconda"
    if num_riga[i] == 3:
        num_riga[i] = "Terza"

# Formating output
if len(num_riga) > 1:
    print("{} riga della {} terzina fino alla {} riga della {} terzina".format(num_riga[0], num_terzine[0], num_riga[-1], num_terzine[-1]))
elif len(num_riga) == 1:
    print("{} riga della {} terzina".format(num_riga[0], num_terzine[0]))

divina_json.close()
