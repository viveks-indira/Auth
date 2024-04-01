
const collatralReportService = async (reqData, token) => {  
    try { 
      const response = await axios.post(
        `${TechExcelBaseUrl}/TechBoRest/api/entry/collatral_report`,
        reqData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } 
      );
      return { success: true, data: response?.data["Success Description"] };
    } catch (error) {
      if (error?.response) {
        console.error("Server responded with status:", error?.response?.status);
        console.error("Response data:", error?.response?.data);
        throw new Error(error?.response?.data[`Error Description`]);
      } else if (error?.request) {
        console.error("No response received:", error?.request);
        throw new Error("Error fetching data from API");
      } else {
        console.error("Error:", error?.message);
        throw new Error(error?.message);
      }
    }
  };
  