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

**Tagger un commit :**
```bash
git tag v1.3 2f7c8b
```

**Supprimer un tag :**
```bash
git tag -d v0.7.14
```

**Afficher l'historique des commits :**
```bash
git log
```

Le log est paginé par défaut par Less. Paramétrable avec `core.pager`.
Presser `q` pour quitter le log.
Options :
- `--stat` Accompagner chaque commit de son `git diff --stat`.
- `-p` Accompagner chaque commit de tout le patch de son `git diff`.
- `--oneline` Afficher chaque commit sur une ligne.
- `--raw` Afficher chaque commit comme stocké dans le commit object.

Il est possible de préciser un path pour afficher tous les commits associés :
```bash
git log README.md
```

**Afficher les modifications effectuées par le dernier commit :**
```bash
git diff
git diff --stat
```

**Mettre de côté son Working Directory :**
```bash
git stash
git stash show
```
Particulièrement utile pour changer de branche au milieu d'un travail en cours, pas prêt pour être commité. 
Pour récupérer les changements :
```bash
git stash apply
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
:exclamation: Ne télécharge que la branche distante liée à la branche sur laquelle pointe HEAD.

**Envoyer le repo :**
```bash
git push
git push --tags
```

Un username par défaut est paramétrable avec `credential.helper`.

Corriger ses erreurs
--------------------

**Modifier le dernier commit :**
```bash
git commit --amend
```
:exclamation: Ne jamais modifier un commit déjà pushé.

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

**Revenir à un commit :**
```bash
git reset HEAD~7
git reset --soft HEAD~7
```
:exclamation: Ne jamais effacer un commit déjà pushé.

Modes :
- `--soft` Modifie uniquement le dépôt (renvient dans l'état avant `git commit`).
- `--mixed` (par défaut) Modifie le repo et la Staging Area (renvient dans l'état avant `git add`).
- `--hard` Modifie le repo, la Staging Area et le Working Directory (perte des modifications). :exclamation:

**Récupérer l'état d'un fichier d'un commit passé :**
```bash
git checkout HEAD~7 script.js
```

Naviguer dans les commits
-------------------------

**Se positionner sur un commit passé :**
```bash
git checkout f580
```
```bash
git checkout HEAD~7
```

Cette action est une opération *read-only* : Git va se positionner en mode `DETACHED HEAD`.
Utiliser `git checkout master` pour se repositionner sur la branche master.

Utiliser les branches
---------------------

**Sortir la liste des branches :**
```bash
git branch
```

**Créer une nouvelle branche :**
```bash
git branch 2.7
```

**Se positionner sur une branche :**
```bash
git checkout 2.7
```

**Fusionner une branche dans la branche actuelle :**
```bash
git merge design_zen
```

**Supprimer une branche :**
```bash
git branch -d design_zen
```
Utiliser l'option `-D` pour forcer la destruction d'une branche non mergée dans `master`.

**Lister les branches distantes :**
```bash
git branch -r
```

**Traquer une branche distante :**
```bash
git branch --track 2.0 origin/2.0
```
Il s'agit de créer une branche locale qui va être liée à la branche distante. 

**Supprimer une *remote tracking branch* :**
```bash
git branch -r -d origin/2.0
```

**Ajouter et supprimer une branche sur le serveur :**
```bash
git push origin origin:refs/heads/master
git push origin :heads/master
```

Le .gitignore
-------------
.gitignore est un fichier à mettre à la racine du repo. Git va totalement ignorer tous les fichiers 
décrits dans le .gitignore. Par exemple :
```bash
var/*
vendor/*
composer.lock
.php_cs
*.tmp
```
:exclamation: Les fichiers traqués (déjà indexés) ne seront pas ignorés ! 
(Git va en quelque sorte ignorer le .gitignore :wink:)

Bonus : effectuer une recherche
-------------------------------
```bash
git grep -n "TODO"
```
Git accepte bien sûr les regex !

Annexe : détails sur les commandes
----------------------------------

### Vocabulaire : un peu de théorie

- **tree-ish** : référence dans l'arborescence. Peut-être : 
	- un sha ou une portion unique : `980e3` ou `980e3ccdaac54a0d4de358f3fe5d718027d96aae`,
	- une suite de commits : `7b593b5..51bea1` (tous les commits de 51bea1, le plus récent, à 7b593b5, le plus vieux; 
	51bea1 compris mais 7b593b5 non compris : **]7b593b5; 51bea1]**), ou `7b593b..` (]7b593b5; HEAD]),
	- un tag : `v1.0` ou `refs/tags/v1.0`,
	- une branche : `master` ou `refs/heads/master`,
	- un remote : `origin/master` ou `refs/remotes/origin/master`,
	- le `HEAD` : `HEAD`.
	Il peut être complété par un suffixe de spécification relative : 
	- une date : `@{yesterday}`, `@{1 month ago}`,
	- un sélecteur ordinal : `@{5}` (soit la 5e référence avant celle explicitée), (? rapport avec `git reflog` ?)
	- un sélecteur ancestral : `~2` ou `^^` (soit le 2e parent de la référence),
	- un pointeur de commit : `^{tree}` (récupère le sha correspondant à la référence),
	- un sélecteur de blob : `:/chemin/vers/le/fichier`.
	Les suffixes peuvent bien sûr s'enchaîner.
- **pathspec** : sélecteur d'un ou plusieurs blobs (ensemble de paths, tout simplement). 
Exemples : `dir/file.md`, `dir/HOW-*`, `*/vendor/*`, `*.js`.

### `git checkout`

**Placer `HEAD` sur une autre branche :**
```bash
git checkout <branch>
git checkout -b <new_branch>
```
L'option `-b` est une contraction de `git branch`.

**Inspecter les arborescences en mode `DETACHED HEAD` :**
```bash
git checkout --detach [<branch>]
git checkout [--detach] <commit>
```

Le mode `DETACHED HEAD` : HEAD réfère à un commit au lieu de référer à une branche.
>    HEAD (refers to commit 'b')
>     |
>     v
> a---b---c---d  branch 'master' (refers to commit 'd')
>     ^
>     |
>   tag 'v2.0' (refers to commit 'b')
Ici, HEAD réfère directement au commit b. Ainsi, en créant des commits, les nouveaux commits ne sont ajoutés 
à aucune branche, et sont référencés uniquement par HEAD :
> 	       HEAD (refers to branch 'master')
>       e---f     |
>      /          v
> a---b---c---d  branch 'master' (refers to commit 'd')
>     ^
>     |
>   tag 'v2.0' (refers to commit 'b')

**Récupérer des fichiers dans leur état passé :**
```bash
git checkout [<tree-ish>] <pathspec>
```
Si <tree-ish> n'est pas spécifié, opère à partir de l'index.

### `git reset`



```bash
git 
```
