export function formatDate(timestampString) {
    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  
    const timestamp = new Date(timestampString);
    const year = timestamp.getFullYear();
    const month = months[timestamp.getMonth()];
    const day = timestamp.getDate();
    let hour = timestamp.getHours();
    let minute = timestamp.getMinutes();
  
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
  
    return `${day} ${month} ${year} ${hour}:${minute}`;
  }
  
  export const handleChange = (e, formData, setFormData) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  export const handleUserChange = (userId, formData, setFormData) => {
    setFormData({ ...formData, createdBy: userId });
  };
  
  export const handleCheckboxChange = (categoryId, formData, setFormData) => {
    const updatedCategoryIds = formData.categoryIds.includes(categoryId)
      ? formData.categoryIds.filter((id) => id !== categoryId)
      : [...formData.categoryIds, categoryId];
  
    setFormData({ ...formData, categoryIds: updatedCategoryIds });
  };
  