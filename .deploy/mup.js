module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: 'ec2-52-53-207-38.us-west-1.compute.amazonaws.com',
      username: 'ubuntu',
      pem: '/Users/andyliang/.ssh/job2.pem',
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
      opts: {
          port: 22,
      },
    }
  },

  app: {
    // TODO: change app name and path
    name: 'app',
    path: '../../JobSearch',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'https://ec2-54-219-179-52.us-west-1.compute.amazonaws.com',
      MONGO_URL: 'mongodb://localhost/meteor',
    },

    // ssl: { // (optional)
    //   // Enables let's encrypt (optional)
    //   autogenerate: {
    //     email: 'email.address@domain.com',
    //     // comma separated list of domains
    //     domains: 'website.com,www.website.com'
    //   }
    // },
    //
    docker: {
      // change to 'kadirahq/meteord' if your app is using Meteor 1.3 or older
      image: 'abernix/meteord:base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};
