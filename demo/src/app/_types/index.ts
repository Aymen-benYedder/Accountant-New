export interface ReducerAction<Type, State> {
  type: Type;
  payload: State;
}
