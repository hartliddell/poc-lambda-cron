export const handler = async (event: any = {}): Promise<any> => {
  console.log("Lambda triggered by cron schedule");
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Cron job executed successfully" }),
  };
};
