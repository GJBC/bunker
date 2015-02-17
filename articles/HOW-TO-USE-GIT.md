How to use Git
==============

Les 3 zones de travail :
![img/areas.png](img/areas.png)

Configurer Git
--------------

```bash
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

Cf : [la configuration de Git](git-scm.com/book/fr/v1/Personnalisation-de-Git-Configuration-de-Git).

Gérer son repo
--------------

**Initialiser un repo Git :**
```bash
git init
```

**Obtenir le statut des fichiers (new, modified or removed) du Working Directory (indexation dans la Staging Area) :**
```bash
git status
```

**Indexer l'état d'un fichier dans la Staging Area :**
```bash
git add my-file.md
```

Indexer tous les fichiers d'un dossier :
```bash
git add dir
```

Sélecteur universel :
```bash
git add *.png
```

**Supprimer un fichier (et indexer la suppression) :**
```bash
git rm my-file.txt
```

Options :
- **`--cached` Supprimer uniquement de la Staging Area.**

**Commiter la Staging Area :**
```bash
git commit
```

Options :
- `-a` Commiter en indexant les *modifications et suppressions* (pas les nouveaux fichiers).
- `-m` Préciser en argument le message de commit.

L'éditeur par défaut utilisé pour inscrire les messages de commit est paramétrable avec `core.editor`.

```bash
git commit -am "Fix bug #13546"
```

**Afficher l'historique des commits :**
```bash
git log
```

Presser `q` pour quitter le log.

Le log est paginé par défaut par Less. Paramétrable avec `core.pager`.

Corriger ses erreurs
--------------------

**Modifier le dernier commit :**
```bash
git commit --amend
```

**Désindexer un fichier :**
```bash
git reset HEAD my-file
```

**Annuler les modifications du Working Directory pour revenir à son état dans la Staging Area :**
```bash
git checkout *
```

**Émettre un commit annulant les changements d'un commit :**
```bash
git revert HEAD~7
```

**Supprimer définitivement un commit :**
```bash
git reset HEAD~7
```
:exclamation: Ne jamais effacer un commit déjà pushé.

Options :
- `--soft` Modifie uniquement le dépôt (renvient dans l'état avant `git commit`).
- `--mixed` (par défaut) Modifie le repo et la Staging Area (renvient dans l'état avant `git add`).
- `--hard` Modifie le repo, la Staging Area et le Working Directory (perte des modifications).

**Récupérer l'état d'un fichier d'un commit passé :**
```bash
git checkout HEAD~7 script.js
```

Naviguer dans les commits
-------------------------

Ces actions sont des opérations *read-only*. 
Utiliser `git checkout master` pour se repositionner sur la branche master.

**Se positionner sur un commit passé :**
```bash
git checkout f580
```
```bash
git checkout HEAD~7
```


Partager le repo
----------------

**Cloner un repo :**
```bash
git clone https://github.com/torvalds/linux.git
```

Lors du clone d'un repo, un remote `origin` est ajouté.

**Gérer un remote pour le repo :**
```bash
git remote -v
git remote add origin https://github.com/GJBC/bunker.git
git remote rename origin GitHub
git remote remove GitHub
```

**Attacher une branche distante :**
```bash
git branch --set-upstream-to=origin/master master
```

**Récupérer le repo :**
```bash
git pull
```
:question: `git pull` est un raccourci pour `git fetch` > `git merge`.

**Envoyer le repo :**
```bash
git push
git push --tags
```

Un username par défaut est paramétrable avec `credential.helper`.


```bash
git 
```
