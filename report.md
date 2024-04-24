Report on Table Component Assignment

Challenges Faced:
1. Data Fetching:
Challenge: The `fetchData` function returned a Promise instead of the actual data, causing rendering errors.
Solution: Modified the `fetchData` function to return the actual data, ensuring correct data fetching.

2. Data State Management:
Challenge: Incorrectly fetching and updating data in the state within the `useEffect`.
Solution: Created a new `fetchDataAsync` function within the `useEffect` to correctly fetch and update the data.

3. Sorting Functions:
Challenge: Sorting functions were not implemented correctly, leading to incorrect data display.
Solution: Refactored the sorting functions to correctly sort the data based on employee ID, name, project name, and date.

4. Error Handling:
Challenge: Lack of robust error handling within the data fetching function.
Solution: Improved error handling within the `fetchData` function to throw an error instead of logging it.

Approach for Future Development:
1. Error Handling:
Implement robust error handling mechanisms to manage and display errors to the user, ensuring a better user experience.

2. User Feedback:
Provide feedback to the user upon successful sorting with notifications or alerts to enhance user experience.

3. Optimization:
Optimize the code for better performance, considering potential large datasets, by implementing pagination or lazy loading.

4. Enhanced User Interface:
Improve the user interface with better styling, interactive elements, and possibly incorporate a frontend framework like React or Vue.js for more dynamic and maintainable code.

5. Data Structure Validation:
Implement checks to ensure the existence of properties before accessing them to prevent runtime errors.

Additional Libraries/Frameworks Used:
The application was developed using React, Axios for HTTP requests, and plain JavaScript for data manipulation and sorting.
