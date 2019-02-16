let apiUrl = 'http://api:5000';

if (process.env.REACT_APP_ENV === 'staging') {
  apiUrl = 'AWS_STG_API';
} else if (process.env.REACT_APP_ENV === 'production') {
  apiUrl = 'AWS_PROD_API';
}

export default {
  apiUrl,
};
