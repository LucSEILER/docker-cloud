isole une partie du kernel/OS

c'est un processus, il a un cycle de vie

le manipuler avec entrypoint et stopsignal, avec docker engine

vm sont plus isolées que Docker -> VM a une meilleure sécurité que Docker

Images. Elles sont immutables, elles ne bougent pas. Il faut rebuild
Des règles de démarrage (FROM, spécifier des commandes)

Container = image en cours d'execution. Quand une image est démarée

Par défaut, un network bridge est créé automatiquement
un stopsignal par défaut SIGTERM 10 secondes

Avec entrypoint, on va pouvoir transformer le PID 1. Seul le PID 1 peut écouter les signaux de terminaison

Avec [ "" ] on passe en mode Shell

Sans, c'est en mode CMD

Container a une limite de RAM

Si limite < RAM utilisée, le Docker va s'arréter avec OOM (Out Of Memory)

Compose => Single host (tout sur une même machine)

Aller sur Swarm ou K8 pour du scaling, load-balancing. Mais ce n'est pas automatique

Sur swarm, n Docker = n host, avec réglages comme réplicas, deploy key...

Cycle de vie - lancer compose


```
gitradar/
├── gitradar-api/
│ ├── 
│ ├──
│ ├──
│ └── scripts/
│    ├── check_commit_msg.py
│ └── src/
│    └── auth/
│      ├── dependencies.py
│      ├── router.py
│      ├── schemas.py
│      └── service.py
│    └── sessions/
│      └── service.py
│ └── tests/
│    └── routes/
│    └── unit/
│    └── integration/
│ ├── venv/
│ ├── .env
│ ├── .env.template
│ ├── .gitignore
│ ├── .pre-commi-config.yaml
│ ├── pyproject.toml
│ ├── README.md
| └── requirements.txt
├── docker-compose.yml # Orchestration des 3 services
└── README.md # Documentation du projet
```