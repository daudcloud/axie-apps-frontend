export const getBattles = async (user) => {
  try {
    if (!user) return null;
    if (user.roninAddress === "") return null;
    const res = await fetch(
      `https://game-api.axie.technology/logs/pvp/${user.roninAddress}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return "error";
  }
};

export const getUserInfo = async (user) => {
  try {
    if (!user) return null;
    if (user.roninAddress === "") return null;
    const res = await fetch(
      `https://game-api.axie.technology/api/v1/${user.roninAddress}`
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return "error";
  }
};

export const getUserAxies = async (user) => {
  try {
    if (!user) return null;
    if (user.roninAddress === "") return null;
    const res = await fetch(
      `https://axieinfinity.com/graphql-server-v2/graphql?query={axies(from:0,size:100,sort:IdAsc,owner:%22${user.roninAddress.replace(
        "ronin:",
        "0x"
      )}%22){total,results{id}}}`
    );
    const { data } = await res.json();
    return data.axies.results;
  } catch (error) {
    console.error(error);
    return "error";
  }
};

export const getAxies = async (user) => {
  try {
    if (!user) return null;
    const userAxies = await getUserAxies(user);
    if (!userAxies) return null;
    const baseUrl = "https://api.axie.technology/getaxies/";
    let url = baseUrl;
    for (let i = 0; i < userAxies.length; i++) {
      if (i < userAxies.length - 1) {
        url += `${userAxies[i].id},`;
      } else {
        url += userAxies[i].id;
      }
    }
    const res = await fetch(url);
    const data = res.json();
    return data;
  } catch (error) {
    console.error(error);
    return "error";
  }
};
