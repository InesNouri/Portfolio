## AlloDoc
🏥 Core medical services
Doctors directory
View doctor profiles and specialties
Contact medical staff
Appointment booking
At the doctor's office
At the patient's home
Potentially manage/cancel appointments

Technologies:

Java for Android application development
XML for UI layouts
Firebase Authentication for user authentication
Cloud Firestore for storing doctors, patients, appointments and medical data
Firebase Cloud Messaging (FCM) for appointment and service notifications

💊 Pharmacy services

This is one of the stronger differentiators:

Find pharmacies near the user's current location
Display whether a pharmacy is:
🟢 Open
🔴 Closed
🌙 On duty / pharmacie de service
Particularly useful for weekends and holidays
Location-based pharmacy search
🥗 Nutrition

Currently in progress:

Nutrition forum
Community discussions/questions
Potential interaction between users and nutrition professionals
🤖 AI / Chatbot

Also in progress:

Healthcare-oriented chatbot
Could potentially help users navigate the application, find appropriate medical services, answer general health questions, etc.
📍 Location-based functionality

The application isn't just a static directory. It uses the user's location to provide contextual services, particularly pharmacies and potentially home consultations.

## Tawsila
Taxi & Transportation Android Application

Tawsila was an Android transportation application designed to provide users with a mobile interface for taxi and transportation services.

The project gave i hands-on experience with native Android development, cloud services, UI/UX design, and mobile application architecture.

📱 Android Development

The application was developed natively using:

☕ Java for application logic
🧩 XML for Android layouts and interfaces

Java was responsible for the application's behavior and interactions, while XML was used to structure and design the different screens.

🔥 Firebase

i integrated Firebase to provide cloud/backend functionality for the application.

This allowed the mobile application to communicate with cloud services without requiring a completely custom backend infrastructure.

🎨 UI/UX Design

i designed the application's interfaces using Figma.

The workflow was essentially:

🎨 Figma
   ↓
📐 UI/UX Design
   ↓
🧩 XML Layouts
   ↓
☕ Java Logic
   ↓
🔥 Firebase
   ↓
📱 Android Application
🚖 Transportation Focus

The application was centered around taxi/transportation services, providing a mobile experience for users interacting with the transportation system.

🛠️ Main Technologies

☕ Java · 📱 Android · 🧩 XML · 🔥 Firebase · 🎨 Figma

## Siflow 
Cloud Infrastructure & DevOps | AWS + Terraform

Siflow was my end of study project for my master's degree focused on designing, deploying, securing, and monitoring the AWS cloud infrastructure supporting a data analytics platform.

my role focused specifically on the infrastructure layer, using AWS and Terraform to build a reproducible, scalable, secure cloud environment.

🏗️ Infrastructure as Code

i designed and provisioned the AWS infrastructure using Terraform, replacing manual cloud configuration with reproducible Infrastructure as Code.

i worked with:

🏢 Amazon VPC
🌐 Subnets
🚪 Internet Gateway
🔀 Route Tables
🚦 NAT Gateway
🔗 VPC Endpoints
🛡️ Security Groups
🗄️ Amazon RDS
📊 Amazon Redshift Serverless
🔄 AWS DMS
📦 Amazon ECS
⚡ AWS Lambda
⚖️ Application Load Balancer
🚀 API Gateway
🌐 AWS Networking

i designed the project's VPC architecture across multiple Availability Zones in eu-west-3 (Paris).

The infrastructure included:

Public and private subnets
Routing between network components
NAT Gateway for private outbound access
Internet Gateway
S3 VPC Endpoint
Security Groups controlling service-to-service communication
🔐 Security

Security was integrated directly into the infrastructure:

🔑 AWS Secrets Manager for RDS, Redshift, and DMS credentials
👤 AWS IAM for access control and service permissions
🛡️ Security Groups for network-level access control
🔒 Private networking for internal resources
📊 Monitoring & Observability

i implemented AWS monitoring using:

📈 Amazon CloudWatch
🚨 CloudWatch Alarms
🔔 Amazon SNS
📋 CloudWatch Log Groups
📊 CloudWatch Dashboards

i monitored conditions such as:

CPU utilization
Disk usage
Redshift query duration
DMS CDC latency
💰 Cost Monitoring

i also used AWS Cost Explorer to monitor infrastructure costs and understand cloud resource consumption.

🔄 Terraform State & Automation

i configured an S3 backend for Terraform state management and structured the infrastructure using Terraform modules.

🧪 Local Development

For local infrastructure testing and development, i used:

🐳 Docker
☁️ LocalStack
🐧 WSL
💻 VS Code
🚀 CI/CD

i designed an Azure DevOps pipeline for Terraform:

Pull Request
     ↓
Terraform Validation
     ↓
Terraform Plan
     ↓
Code Review
     ↓
Merge to main
     ↓
Terraform Apply
🛠️ Main Technologies

AWS · Terraform · Docker · LocalStack · Azure DevOps · CloudWatch · IAM · Secrets Manager · Redshift Serverless · RDS · DMS · ECS · Lambda · API Gateway · ALB · VPC