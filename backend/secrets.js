const secrets = {
  dbUri: "mongodb://Oleg:megapassword11@ds145121.mlab.com:45121/qualuim_crud"
};

export const getSecret = key => secrets[key];
