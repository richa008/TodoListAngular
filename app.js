var todoApp = angular.module("todoApp", []);

todoApp.controller("todoListController", function($scope){

   $scope.todos = [];
    
    function loadTodos(){
      var savedTodos = localStorage.getItem('todos');
        if(savedTodos != null){
            $scope.todos = JSON.parse(savedTodos);    
        }
    };
    loadTodos();
    
    $scope.saveToLocalStorage = function(){
        localStorage.setItem('todos', JSON.stringify($scope.todos));
    };
    
    $scope.addTodo = function(){
        if($scope.newTodo.length > 0){
            $scope.todos.push({taskName: $scope.newTodo, isDone: false});
            $scope.newTodo = "";
            $scope.saveToLocalStorage();
        }       
    };
    
    $scope.removeCompleted = function(){
      var oldTodos = $scope.todos;
		$scope.todos = [];
		angular.forEach(oldTodos, function(todo){
			if (!todo.isDone)
				$scope.todos.push(todo);
		});
		localStorage.setItem('todos', JSON.stringify($scope.todos));  
    };
    
    $scope.completedTodos = function(){
      var count = 0;
      angular.forEach($scope.todos, function(todo){
          if(todo.isDone == true){
            count++;         
          }
      });
      return count;          
    };
    
});