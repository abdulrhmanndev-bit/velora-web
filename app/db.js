import sql from "mssql";

const accountConfig = {
  user: "sa",
  password: "anapoda",
  server: "DESKTOP-8R2V2VR",
  database: "SRO_VT_ACCOUNT",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const shardConfig = {
  user: "sa",
  password: "anapoda",
  server: "DESKTOP-8R2V2VR",
  database: "SRO_VT_SHARD",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let accountPool = null;
let shardPool = null;

export async function getAccountDB() {
  if (!accountPool) {
    accountPool = new sql.ConnectionPool(accountConfig);
    await accountPool.connect();
  }
  return accountPool;
}

export async function getShardDB() {
  if (!shardPool) {
    shardPool = new sql.ConnectionPool(shardConfig);
    await shardPool.connect();
  }
  return shardPool;
}

export default {
  getAccountDB,
  getShardDB
};
