terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}

provider "docker" {
  host = "unix:///var/run/docker.sock"
}

#network
resource "docker_network" "queue-default" {
  name = "queue-default"
}

#images
resource "docker_image" "queue" {
  name = "rabbitmq:management"
}

# Create a container
resource "docker_container" "queue" {
  image = docker_image.queue.image_id
  name  = "queue"
  networks_advanced {
    name = docker_network.queue-default.name
  }
  ports {
    internal = 5672
    external = 5672
  }
  ports {
    internal = 15672
    external = 15672
  }
}
