build:
	@docker context use default
	@docker-compose build

run:
	@echo "Connect to http://localhost:80"
	@docker-compose run -p 80:8838 view

deploy:
	#docker context create ecs rebillion
	aws configure set default.region eu-west-3
	docker context use default
	docker-compose build
	aws ecr get-login-password --region eu-west-3 --profile rebillion \
| 		docker login --username AWS --password-stdin 809239748375.dkr.ecr.eu-west-3.amazonaws.com
	docker push 809239748375.dkr.ecr.eu-west-3.amazonaws.com/rebillion-ui
	docker context use rebillion
	docker-compose up
	docker context use default
