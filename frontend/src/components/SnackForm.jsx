export default function SnackForm({
  calories,
  setCalories,
  mealType,
  setMealType,
}) {
  return (
    <div className="snack-form">
      <div className="form-group">
        <label>Select Meal Type</label>
        <select
          className="input-box"
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          required
        >
          <option value="BREAKFAST">Breakfast</option>
          <option value="LUNCH">Lunch</option>
          <option value="DINNER">Dinner</option>
          <option value="SNACK">Snack</option>
        </select>
      </div>
      <div className="form-group">
        <label>Enter calories available:</label>
        <input
          className="input-box"
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
      </div>
    </div>
  );
}
