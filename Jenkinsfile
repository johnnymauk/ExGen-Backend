#!/usr/bin/env groovy

void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/johnnymauk/ExGen-Backend"],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "https://258.mauk.house/jenkins/jobs/ExGen-Backend/latestbuild/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

pipeline {

    agent {
        docker {
            image 'node'
            args '-u root'
        }
    }

    stages {
        stage('Build') {
            steps {
                setBuildStatus("Build pending", "PENDING");
                echo 'Building...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                setBuildStatus("Build succeeded", "SUCCESS");
                echo 'Testing...'
                sh 'npm test'
            }
        }
    }

    post {
        success {
            setBuildStatus("Build succeeded", "SUCCESS");
        }
        failure {
            setBuildStatus("Build failed", "FAILURE");
        }
      }
}
