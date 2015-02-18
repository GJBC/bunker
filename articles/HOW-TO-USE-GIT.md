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
