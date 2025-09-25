pipeline{
  agent any
  stages{
    stage("Install dependency"){
      steps{
        sh npm ci
      }
    }

    stage("Run test"){
      steps{
        sh npm test
      }
    }
  }
}