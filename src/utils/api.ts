interface GetRespond {
  statusCode: number;
  message: string;
}

export const getRespond = ({ statusCode, message }: GetRespond) => {
  return {
    statusCode,
    body: JSON.stringify({ message })
  }
}