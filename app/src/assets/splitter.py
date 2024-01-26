import json
import re

# Function to load a JSON file
def load_json(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return json.load(file)

# Function to save a dictionary to a JSON file
def save_json(data, filename):
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=4, ensure_ascii=False)

# Load the Quran data
quran_tr = load_json('quran_tr.json')

# Initialize empty dictionaries for verses, titles, first indexed titles, and notes
verses_map = {}
titles_map = {}
first_indexed_titles = {}
notes_map = {}

# Process the data
for page, content in quran_tr.items():
    for sura, sura_content in content.get('sura', {}).items():
        if sura not in verses_map:
            verses_map[sura] = {}
            titles_map[sura] = {}
        for verse, text in sura_content.get('verses', {}).items():
            verses_map[sura][verse] = text
        for title, text in sura_content.get('titles', {}).items():
            titles_map[sura][title] = text
            if title == "1":
                first_indexed_titles[sura] = text

    if 'notes' in content:
        for note in content['notes']['data']:
            # Extract the verse reference from the note, adjusting to capture multiple asterisks
            match = re.match(r"\*+\s*(\d+:\d+)", note)
            if match:
                verse_ref = match.group(1)
                if verse_ref not in notes_map:
                    notes_map[verse_ref] = []
                notes_map[verse_ref].append(note)

# Save the processed data to new files
save_json(verses_map, 'verses.json')
save_json(titles_map, 'titles.json')
save_json(first_indexed_titles, 'suras.json')
save_json(notes_map, 'notes.json')
