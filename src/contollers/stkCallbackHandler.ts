/**
 * Method to handle STK Push callback response data.
 * This method processes the response and returns the transaction details.
 * @param stkCallbackData - The raw STK Callback data object (typically from an HTTP request)
 * @returns An object with the processed transaction information or an error message.
 */
export function handleStkPushCallback(stkCallbackData: any): {
  success: boolean;
  message: string;
  data?: any;
} {
  const { Body } = stkCallbackData;

  if (!Body || !Body.stkCallback) {
    return { success: false, message: "Invalid STK callback data" };
  }

  const callback = Body.stkCallback;

  // Check if the transaction was successful (ResultCode === 0 means success)
  if (callback.ResultCode === 0) {
    const metadata = callback.CallbackMetadata.Item;

    // Extract transaction details from the callback metadata
    const amount = metadata.find((item: any) => item.Name === "Amount")?.Value;
    const receiptNumber = metadata.find(
      (item: any) => item.Name === "MpesaReceiptNumber"
    )?.Value;
    const phoneNumber = metadata.find(
      (item: any) => item.Name === "PhoneNumber"
    )?.Value;
    const transactionDate = metadata.find(
      (item: any) => item.Name === "TransactionDate"
    )?.Value;

    // Return the successful transaction data
    return {
      success: true,
      message: "Transaction successful",
      data: {
        amount,
        receiptNumber,
        phoneNumber,
        transactionDate,
      },
    };
  } else {
    // Handle the failed transaction
    const resultDescription = callback.ResultDesc;
    return {
      success: false,
      message: `Transaction failed: ${resultDescription}`,
    };
  }
}
