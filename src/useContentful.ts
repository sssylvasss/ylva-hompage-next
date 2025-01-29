import { createClient } from "contentful";

export const useContentful = () => {
  // interface ICollageItem{

  // 	fields: {
  // 		collageId: number,
  // 		collageTitle: string,
  // 		image: {
  // 			fields: any,
  // 			metadata: any,
  // 			sys: any,
  // 			serie: string,
  // 			year: string,
  // 		  }
  // 	},
  // 	metadata: {
  // 		tags: []
  // 	},
  // 	sys: any,
  // 	collageImage: {
  // 		description: string,
  // 		file: any,
  // 		titlel: string,
  // 	  }

  // }

  // interface IVideoItem {
  // 	fields: {
  // 	description: string,
  // 	id: string,
  // 	title: string,
  // 	videoImage: {
  // 		fields: {},
  // 		description: string,
  // 		file: any,
  // 		titlel: string,
  // 	  },
  // 	}
  // 	  metadata: any,
  // 	  sys: any
  // }

  const client = createClient({
    space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
    accessToken:
      process.env.NEXT_PUBLIC_IS_PREVIEW === "true"
        ? process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN!
        : process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN!,
  });

  const getCollage = async () => {
    try {
      const entries = await client.getEntries({
        content_type: "spiritOfVietnam",
      });
      const filteredEntries = entries.items.map((item: any) => {
        const collageImage = item.fields.image.fields;
        return {
          ...item.fields,
          collageImage,
        };
      });
      return filteredEntries;
    } catch (err) {
      console.log(`error fetching data": ${err}`);
    }
  };

  const getChickens = async () => {
    try {
      const entries = await client.getEntries({
        content_type: "chickens",
      });
      const filteredEntries = entries.items.map((item) => {
        const { nr, photo } = item.fields;
        const photoUrl =
          photo && (photo as any).fields
            ? (photo as any).fields.file.url
            : null;
        return {
          id: nr,
          photo: photoUrl,
        };
      });
      return filteredEntries;
    } catch (err) {
      console.log(`error fetching data: ${err}`);
    }
  };
  interface Chicken {
    id: number;
    photo: string | null;
  }

  const getChickenById = async (id: string): Promise<Chicken | null> => {
    try {
      const entries = await client.getEntries({
        content_type: "chickens",
        "fields.nr": id,
      });
      const item = entries.items[0];
      const { nr, photo } = item.fields;
      const photoUrl = photo ? photo.fields.file.url : null;
      return {
        id: nr,
        photo: photoUrl,
      };
    } catch (err) {
      console.log(`error fetching data: ${err}`);
      return null;
    }
  };

  const getCv = async () => {
    try {
      const entries = await client.getEntries({
        content_type: "cv",
      });
      const filteredEntries = entries.items.map((item) => {
        return {
          ...item.fields,
        };
      });
      return filteredEntries;
    } catch (err) {
      console.log(`error fetching data": ${err}`);
    }
  };

  const getVideo = async () => {
    try {
      const entries = await client.getEntries({
        content_type: "video",
      });

      const filteredEntries = entries.items.map((item: any) => {
        const videoImage = item.fields.videoImage.fields;

        return {
          ...item.fields,
          videoImage,
        };
      });
      return filteredEntries;
    } catch (err) {
      console.log(`error fetching data": ${err}`);
    }
  };

  return { getCollage, getCv, getVideo, getChickens, getChickenById };
};
