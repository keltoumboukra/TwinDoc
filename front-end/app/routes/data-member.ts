
const cmsUrl = process.env.STRAPI_URL || "http://localhost:1337";

export type MemberProfileType = {
  id: number,
  firstName: string,
  lastName: string,
  company: string,
  title: string,
  twitter: string,
  avatar: string,
}

export const getMembers = async () => {
  const response = await fetch(`${cmsUrl}/api/members/`)
  const data = await response.json()
  const members = flattenAttributes(data.data)
  return members
}

export const getMemberProfile = async (id: number) => {
  const response = await fetch(`${cmsUrl}/api/members/${id}`)
  const data = await response.json()
  const profile = flattenAttributes(data?.data)
  return profile
}

export const updateMemberProfile = async (id: number, updates: any) => {
  try {
    const response = await fetch(`${cmsUrl}/api/members/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({data: {...updates}}),
    });
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}


export function flattenAttributes(data: any): any {
  // Base case for recursion
  if (!data) return null;

  // Handling array data
  if (Array.isArray(data)) {
    return data.map(flattenAttributes);
  }

  let flattened: { [key: string]: any } = {};

  // Handling attributes
  if (data.attributes) {
    for (const key in data.attributes) {
      if (
        typeof data.attributes[key] === "object" &&
        data.attributes[key] !== null &&
        "data" in data.attributes[key]
      ) {
        flattened[key] = flattenAttributes(data.attributes[key].data);
      } else {
        flattened[key] = data.attributes[key];
      }
    }
  }

  // Copying non-attributes and non-data properties
  for (const key in data) {
    if (key !== "attributes" && key !== "data") {
      flattened[key] = data[key];
    }
  }

  // Handling nested data
  if (data.data) {
    flattened = { ...flattened, ...flattenAttributes(data.data) };
  }

  return flattened;
}