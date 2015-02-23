How to use DOS
==============

Ouvrir un prompt DOS
--------------------

Pour ouvrir l'invite de commandes, il existe plusieurs moyens :
- taper `cmd` dans la barre de recherche.
- dans Windows 8, y accèder par un clic droit sur le coin réactif du menu Démarrer.
- accèder directement à un dossier avec `MAJ` + `clic-droit` > `Ouvrir une fenêtre de commandes ici`.

Les commandes de base
---------------------

**Afficher la liste des commandes :**
```bash
help
```

**Afficher des détails sur l'utilisation d'une commande :**
```bash
help help
```

**Print directory:**
```bash
dir my-dir
```

**Change directory:**
```bash
cd my-dir
```

**Make directory :**
```bash
md new-dir
```

**Remove directory :**
```bash
rd dir
```

**Display a file : **
```bash
type my-file
```

**Create or edit a file :**
```bash
notepad file
notepad++ file
```

**Delete a file :**
```bash
del my-file
```

**Copy a file:**
```bash
copy my-file to-my-new-file
```

**Copy files and directories :**
```bash
xcopy
```

**Move a file:**
```bash
move my-file to-my-new-file
```

**Rename a file:**
```bash
ren my-file to-my-new-file
```

**Clear the terminal:**
```bash
cls
```

**Quit the promt DOS:**
```bash
exit
```

**Start a prompt DOS:**
```bash
start
```

**Afficher le graphisme de la structure de répertoire d'un lecteur ou d'un chemin d'accès :**
```bash
tree
```

**Modifier la variable environnement PATH :**
```bash
path
help path
```
Pas besoin du mot de passe admin !! (Une faille dans le système, hum... Je me demande s'il y en a d'autres. En tout cas super pratique !)
Dans le même genre existe la commande `set` pour définir des variables d'environnement.

**Afficher la version de Windows :**
```bash
ver
```
Voilà qui est totalement useless ^^

**Arrêter l'ordinateur :**
```bash
shutdown /s
```