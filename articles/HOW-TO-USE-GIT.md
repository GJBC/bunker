How to use Git
==============

Git est un outil de gestion et de partage de versions robuste et très puissant.
Ce n'est pas un hasard si en Swahili, « Git » signifie « divinité toute puissante à la sagacité du renard,
la volupté de l'hippopotame et la virilité du bonobo ».
Cependant Git peut se révéler très complexe. C'est pourquoi j'ai plongé quelques jours dans les tréfonds de
sa documentation pour rédiger cet article, cet aide-mémoire, ce guide qui me permettra à l'avenir je l'espère
de pouvoir utiliser Git avec sérénité, efficacité et aisance.

Les 3 zones de travail :
![img/areas.png](img/areas.png)

Configurer Git
--------------

```bash
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

**Configurer l'éditeur par défaut :**
```bash
git config --global core.editor vim
git config --global core.editor "notepad++ -multiInst -notabbar -nosession -noPlugin"
```

Si l'avantage de Vim est la coloration qui nous avertit d'un débordement,
Notepad++ peut se révéler très pratique pour vérifier la taille des lignes.

**Configurer la mise en cache automatique des mots de passe :**
```bash
git config --global credential.helper cache
```

Pour changer le timeout par défaut :
```bash
git config --global credential.helper 'cache --timeout=3600'
```

**Configurer la gestion automatique des EOL :**
```bash
git config --global core.autocrlf input
git config --global core.eol lf
```
Désactive la conversion des `lf` en `crlf` lors du pull mais active celle des `crlf` en `lf`
lors du `git add` grâce à la configuration `lf` pour les EOL.

Imposer le partage de la norme à tous les contributeurs du repo par leur description dans
un fichier de configuration *.gitattributes* :
```
* text=auto eol=lf
```
Git va alors imposer la normalisation des `lf` dans le repo et empêcher la conversion en `crlf`
lors de l'extraction.

:question: La suite de cette section sert à convertir les EOF d'un repo selon la configuration.
Totalement inutile si le repo a déjà des EOF corrects.

Pour normaliser ensuite le repo :
```bash
git rm --cached -r
git add .
git commit -m "Normalize all the line endings"
```

Pour finir par normaliser le Working Directory :
```bash
git reset --hard
```

Ouf !

Le mot d'ordre à propos des EOL : **ne pas se compliquer la vie** (je commence à apprendre que
de manière générale c'est valable pour à peu près tout.').

Cf : [la configuration de Git](http://git-scm.com/book/fr/v1/Personnalisation-de-Git-Configuration-de-Git).

Effectuer des commits
---------------------

**Initialiser un repo Git :**
```bash
git init
```

**Obtenir le statut du repo :**
```bash
git status
```

**Comparer le Working Directory et la Staging Area :**
```bash
git diff
git diff --stat
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

```bash
git commit -am "Fix bug #13546"
```

:exclamation: Éviter tout de même l'argument `-m`, mène généralement à de mauvais messages de
commits. Cf les [propos de Torvalds lui-même](https://github.com/torvalds/linux/pull/17#issuecomment-5659933).
Les règles pour de bons messages de commits sont décrites dans l'incontournable
[A Note About Git Commit Messages](tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
de Tim Pope. Voir également cet excellent article, clair et simple, idéal à retenir et appliquer :
[5 Useful Tips For A Better Commit Message](https://robots.thoughtbot.com/5-useful-tips-for-a-better-commit-message).

**Tagger un commit :**
```bash
git tag v1.3 2f7c8b
```

**Supprimer un tag :**
```bash
git tag -d v0.7.14
```

**Mettre de côté son Working Directory :**
```bash
git stash
```
Particulièrement utile pour changer de branche au milieu d'un travail en cours, pas prêt pour être commité.
Pour récupérer les changements :
```bash
git stash apply
```

`git stash` est un set de commande qui permet de gérer la pile de *stash*. On a par exemple :
- `git stash show [<stash>]` Montrer le <stash>.
- `git stash list` Lister les *stash*.
- `git stash drop [<stash>]` Supprimer le <stash>.
- `git stash pop [<stash>]` Effectue `git stash apply [<stash>]` > `git stash drop [<stash>]`.
- `git stash clear` Supprime tous les *stash*.

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

:exclamation: Ne récupère que la branche distante liée à la branche sur laquelle pointe HEAD.
De plus, afin de ne pas avoir à polluer l'historique d'une fausse fusion lors du pull, il est préférable
d'effectuer un *rebasing*.
Cf la partie consacrée : [Travailler avec `git rebase`](#travailler-avec-git-rebase).
:question: Il existe un outil pour pallier à tous ces inconvénients, malheuresement imcompatible avec
Windows : [aanand/git-up](https://github.com/aanand/git-up).

**Envoyer le repo :**
```bash
git push
```

Par défaut, seule la branche sur laquelle pointe HEAD est envoyée. Options :
- `--tags` Pour envoyer tous les tags.
- `--all` Pour envoyer toutes les branches.
- `--mirror` Envoie **toutes** les références et **force** la mise  à jour.
	:exclamation: Dangereux, à manipuler avec précaution.
- `-u` Pour chaque branche envoyée avec succès, ajoute une *upstream reference*.

:exclamation: Un push doit toujours merger en *fast-forward*, c'est-à-dire ajouter les nouveaux commits
directement à la suite de la branche sans avoir à intercaller les commits et gérer les éventuels conflits.
La branche locale doit donc toujours être mise à jour grâce à `git pull` avant d'être pushée.

Le stockage ou la mise en cache des identifiants est paramétrable avec `credential.helper` :
```bash
git config --global credential.https://github.com.username Zzortell
```

Naviguer dans les commits
-------------------------

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

**Se positionner sur un commit passé :**
```bash
git checkout f580
```
```bash
git checkout HEAD~7
```

Cette action est une opération *read-only* : Git va se positionner en mode `DETACHED HEAD`.
Utiliser `git checkout master` pour se repositionner sur la branche master.

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
:question: Cette opération est l'inverse de `git add`.

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

**Retrouver un état du repo :**
`git reflog` est un set de commandes permettant de gérer la pile des états du repo.
Combiné à `git reset`, on peut ainsi annuler des manipulations ayant mal tournées
(un `git rebase` incontrolable, etc. ;)
```bash
git reflog
git reset --hard HEAD@{1}
```

Travailler avec les branches
----------------------------

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

**Se positionner sur une nouvelle branche :**
```bash
git checkout -b 2.7
```

**Se positionner sur une nouvelle branche vide :**
```bash
git checkout --orphan "(resources)"
```

**Fusionner une branche dans la branche actuelle :**
```bash
git merge design_zen
```
:question: Lors d'une fusion, des modifications apportées par les commits des deux branches
peuvent rentrer en conflit. Git crée alors dans les fichiers concernés une zone de conflit. Par exemple :
```
<<<<<<< HEAD:index.html
<body id="home" lang="en">
=======
<body id="home" lang="fr">
>>>>>>> dev:index.html
```
Il faut alors résoudre manuellement les conflits et effectuer un nouveau commit.

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

Garder un historique propre
---------------------------

### Utiliser `git rebase -i` pour unir des commits
Prenons l'historique suivant :
```
git log --oneline
5693149 Rewritte the fixing of #13546
6498e49 Refix issue #13546
750ff38 Add some tests for issue #13546
1932a71 Fix issue #13546
...
```
Ces 4 commits seraient bien mieux ensemble avant de rejoindre le serveur. On peut facilement faire ça avec :
```bash
git rebase -i HEAD~4
```
Éditer alors le fichier lancé par Git en précédant les commits à unir par `squash` :
```
pick 5693149 Rewritte the fixing of #13546
squash 6498e49 Refix issue #13546
squash 750ff38 Add some tests for issue #13546
squash 1932a71 Fix issue #13546
```
Les 4 commits vont alors être recombinés dans un nouveau commit, par exemple :
`0fc4eea Fix issue #13546 and add tests`.

:exclamation: Ne JAMAIS réécrire des commits déjà pushés.

### Travailler avec `git rebase`

:question: Cette section est légèrement complexe, à appréhender avec une bonne maîtrise de tout ce qui
précède.

Lorsqu'on travaille sur une branche locale et temporaire, il serait malpropre de merger directement
cette branche dans la branche principale. En effet, en ayant un historique divergent comme celui-la :

![img/rebase-1.png](img/rebase-1.png)

un *true merge* brise la linéarité de l'historique :

![img/rebase-2.png](img/rebase-2.png)

Afin de l'éviter, on peut au préalable utiliser `git rebase` pour recommiter `C4` à la suite de `master` :
```bash
git checkout experiment
git rebase -p master
```
On obtient donc :
![img/rebase-3.png](img/rebase-3.png)

Il ne reste plus qu'à merger `experiment` dans `master`, maintenant en *fast-forward* :
```bash
git checkout master
git merge experiment
```

On obtient ainsi finalement un historique parfaitement propre :
![img/rebase-4.png](img/rebase-4.png).

:exclamation: `git rebase` va réémettre de façon linéaire tous les commits et détruire par la même occasion
toute arborescence complexe (non linéaire) de la branche rebasée. Il est donc important de toujours préciser
l'option `-p` afin de préserver les liens qu'ont les commits entre eux.

Cela est également utile lors d'un pull (avant un push de notre travail par exemple) alors que
d'autres commits ont été pushés entre temps sur la branche distante. En effet avec un pull habituel,
Git effectue un *true merge* de la branche distante dans la branche locale, ce qui a pour effet
d'inscrire dans l'historique une fausse fusion. Il est préférable de réécrire l'historique puis
de fusionner les branches en *fast-forward* en appelant `git pull --rebase=preserve`. De manière générale,
il est pertinent de configurer Git pour toujours effectuer des pulls avec rebase (et bien sûr l'option
--preserve) :
```bash
git config --global pull.rebase preserve
```

:question: Par défaut, `git merge` effectuera un *fast-forward merge* si aucun commit n'a été rajouté sur
la branche principale. Mais attention, cela peut se retourner contre nous si on souhaite réellement
fusionner une branche secondaire dans la branche principale. Utiliser dans ce cas là l'option `--no-ff`.

:exclamation: Ne JAMAIS réécrire des commits déjà pushés. `git rebase` est réservé au replacement
de commits locaux sur la branche principale.

Cf : [Git Attitude : Bien utiliser git merge et rebase](http://www.git-attitude.fr/2014/05/04/bien-utiliser-git-merge-et-rebase/).
Un diapo sur la question tellement génial que je l'ajoute : http://webadeo.github.io/git-simpler-better-faster-stronger/

Le .gitignore
-------------
.gitignore est un fichier à mettre à la racine du repo. Git va totalement ignorer tous les fichiers
décrits dans le .gitignore. Par exemple :
```
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

Voici quelques détails sur les signatures de certaines commandes très versatiles (polyvalentes). Mais avant...

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
	- un sélecteur ordinal : `@{5}` (soit la 5e référence avant celle explicitée), (`git reflog`)
	- un sélecteur ancestral : `~2` ou `^^` (soit le 2e parent de la référence),
	- un pointeur de commit : `^{tree}` (récupère le sha correspondant à la référence),
	- un sélecteur de blob : `:/chemin/vers/le/fichier`.

	Les suffixes peuvent bien sûr s'enchaîner.
- **pathspec** : sélecteur d'un ou plusieurs blobs (ensemble de paths, tout simplement).
Exemples : `dir/file.md`, `dir/HOW-*`, `*/vendor/*`, `*.js`.

Il faut bien comprendre également que la référence HEAD est comme un 'curseur' de navigation,
et qu'elle pointe normalement sur une branche et donc sur un commit (puisqu'une branche pointe
elle-même sur un commit), sauf en mode `DETACHED HEAD` où elle ne pointe que sur un commit,
mais également sur un état du repo (au sens de `git reflog`). La pile *reflog* est donc en
quelque sorte l'historique de tous les états passés de HEAD, tandis que *log* est l'historique
des commits.

### `git checkout`

**Placer `HEAD` sur une autre branche :**
```
git checkout <branch>
git checkout -b <new_branch>
```
L'option `-b` est une contraction de `git branch`.

**Inspecter les arborescences en mode `DETACHED HEAD` :**
```
git checkout --detach [<branch>]
git checkout [--detach] <commit>
```

Le mode `DETACHED HEAD` : HEAD réfère à un commit au lieu de référer à une branche.
```
   HEAD (refers to commit 'b')
    |
    v
a---b---c---d  branch 'master' (refers to commit 'd')
    ^
    |
  tag 'v2.0' (refers to commit 'b')
```
Ici, HEAD réfère directement au commit b. Ainsi, en créant des commits, les nouveaux commits ne sont ajoutés
à aucune branche, et sont référencés uniquement par HEAD :
```
	       HEAD (refers to branch 'master')
      e---f     |
     /          v
a---b---c---d  branch 'master' (refers to commit 'd')
    ^
    |
  tag 'v2.0' (refers to commit 'b')
```

**Récupérer des fichiers dans leur état passé :**
```
git checkout [<tree-ish>] <pathspec>
```
Si `<tree-ish>` n'est pas spécifié, opère à partir de l'index.

### `git reset`

**Rétablir un état du Working Directory en supprimant définitivement les commits intermédiaires :**
```
git reset [<mode>] [<commit>]
```
:exclamation: À bien sûr ne pas utiliser si les commits ont déjà été pushés. Déconseillé de manière générale.
Utiliser `git revert`, la "méthode douce", pour annuler les modifications de commit par de nouveaux commits.

Modes :
- `--soft` Modifie uniquement le dépôt (renvient dans l'état avant `git commit`).
- `--mixed` (par défaut) Modifie le repo et la Staging Area (renvient dans l'état avant `git add`).
- `--hard` Modifie le repo, la Staging Area et le Working Directory (perte des modifications). :exclamation:

**Récupérer dans l'index l'état des fichiers :**
```
git reset [<tree-ish>] <paths>
```
:question: Ainsi, `git reset <paths>` est l'inverse de `git add <paths>`.
`git reset [<tree-ish>] <paths>` est  à la Staging Area ce que `git checkout [<tree-ish>] <pathspec>` est au Working Directory.

Le mode `-p` permet de sélectionner de façon interactive les blocs à rétablir qui diffèrent entre les patchs de l'index et du `<tree-ish>`.
```
git reset -p [<tree-ish>] [<paths>]
```
Ainsi, `git reset -p` est l'inverse de `git add -p`.
