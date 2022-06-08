import { slater, TaskConfig } from "@slaterjs/next";

const config: TaskConfig = {
  tasks: [
    {
      name: "helloWorld",
      schedule: "*/5 * * * *", // 7AM GMT
      handler: async (event, success, failure) => {
        try {
          const results = await fetch("https://makenftweet.com/api/mentions", {
            headers: {
              Authorization: `Bearer ${process.env.NFTWEET_API_KEY}`,
            },
          });
          const data = await results.json();
          if (results.ok) {
            return success(data);
          } else {
            return failure(data);
          }
        } catch (err) {
          return failure(err); // sends 500
        }
      },
    },
  ],
};

export default slater(config);
