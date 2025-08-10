export const test = (props) => {
  return (req, res, next) => {
    const { cookies } = req;
    // console.log({ ...props, cookies });
    next();
  };
};
