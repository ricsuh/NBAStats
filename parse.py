import re
from os import listdir
from os.path import isfile, join

def get_team(code):
   teams = {"BOS": "Boston Celtics",
      "BKN": "Brooklyn Nets",
      "NYK": "New York Knicks",
      "PHI": "Philadelphia 76ers",
      "TOR": "Toronto Raptors",
      "CHI": "Chicago Bulls",
      "CLE": "Cleveland Cavaliers",
      "DET": "Detroit Pistons",
      "IND": "Indiana Pacers",
      "MIL": "Milwaukee Bucks",
      "ATL": "Atlanta Hawks",
      "CHA": "Charlotte Hornets",
      "MIA": "Miami Heat",
      "ORL": "Orlando Magic",
      "WAS": "Washington Wizards",
      "DAL": "Dallas Mavericks",
      "HOU": "Houston Rockets",
      "MEM": "Memphis Grizzlies",
      "NOP": "New Orleans Pelicans",
      "SAS": "San Antonio Spurs",
      "DEN": "Denver Nuggets",
      "MIN": "Minnesota Timberwolves",
      "OKC": "Oklahoma City Thunder",
      "POR": "Portland Trail Blazers",
      "UTA": "Utah Jazz",
      "GSW": "Golden State Warriors",
      "LAC": "Los Angeles Clippers",
      "LAL": "Los Angeles Lakers",
      "PHX": "Phoenix Suns",
      "SAC": "Sacramento Kings"
      } 
   if teams[code]:
      return teams[code]
   else:
      return "No team"

def img_exists(image):
   path = "/Users/ericasuh/NBAStats/nba/public/images/players/"
   images = [f for f in listdir(path) if isfile(join(path, f))]
   if image in images: 
      return True
   else: 
      return False


with open("players.txt", "r") as f:
   output = "let nbaPlayers = ["
   line = f.readline()
   counter = 1
   while line:
      if line.rstrip():
         print(line)
         info = re.search("(\w+),\s(.+)\s,\[(\w+)\]", line)
         if img_exists(f"{info.group(2)}_{info.group(1)}.png"):
            image = f"{info.group(2)}_{info.group(1)}"
         else:
            image = "no-image"
         output += "\n\t{\n"
         output += f"\t\tid: {counter},\n"
         output += f"\t\tfirstName: \"{info.group(2)}\",\n"
         output += f"\t\tlastName: \"{info.group(1)}\",\n"
         output += f"\t\tteam: \"{get_team(info.group(3))}\",\n"
         output += f"\t\timage: \"{image}.png\"\n"
         output += "\t},"
      line = f.readline()
      counter += 1
   output += "\n]\n\nexport default nbaPlayers;"


with open("players.js", "w") as out:
   out.write(output)

