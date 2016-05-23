angular.module('app', ['ngRoute', 'ngCookies']);


angular.module('app').config(['$routeProvider', function (routeProvider) {
        routeProvider.
                when('/', {
                    templateUrl: 'inicio.html',
                    controller: 'mainController'
                }).
                when('/lenguajes', {
                    templateUrl: 'lenguajes.html',
                    controller: 'mainController'
                }).
                when('/lenguajes/nuevo', {
                    templateUrl: 'nuevo.html',
                    controller: 'mainController'
                }).
                when('/lenguajes/editar', {
                    templateUrl: 'nuevo.html',
                    controller: 'mainController'
                }).
                when('/puntua', {
                    templateUrl: 'puntuar.html',
                    controller: 'mainController'
                }).
                when('/ranking', {
                    templateUrl: 'ranking.html',
                    controller: 'mainController'
                })
                ;
    }])
        .run(['$rootScope', '$cookies', function ($rootScope, $cookies) {
                
                $rootScope.lenguajes = $cookies.getObject('lenguajes');
                if (!$rootScope.lenguajes){
                    $rootScope.lenguajes = [
                    {nombre: "Java", descripcion: "Java es un lenguaje de programación de propósito general, concurrente, orientado a objetos que fue diseñado específicamente para tener tan pocas dependencias de implementación como fuera posible", puntuacion: 0},
                    {nombre: "Python", descripcion: "Se trata de un lenguaje de programación multiparadigma, ya que soporta orientación a objetos, programación imperativa y, en menor medida, programación funcional. Es un lenguaje interpretado, usa tipado dinámico y es multiplataforma.", puntuacion: 1},
                    {nombre: "C", descripcion: "C es un lenguaje de programación originalmente desarrollado por Dennis M. Ritchie entre 1969 y 1972 en los Laboratorios Bell,2 como evolución del anterior lenguaje B, a su vez basado en BCPL.", puntuacion: 3},
                    {nombre: "C++", descripcion: "C++ es un lenguaje de programación diseñado a mediados de los años 1980 por Bjarne Stroustrup. La intención de su creación fue el extender al lenguaje de programación C mecanismos que permiten la manipulación de objetos. En ese sentido, desde el punto de vista de los lenguajes orientados a objetos, el C++ es un lenguaje híbrido.", puntuacion: 5},
                    {nombre: "C#", descripcion: "C#1 (pronunciado si sharp en inglés) es un lenguaje de programación orientado a objetos desarrollado y estandarizado por Microsoft como parte de su plataforma .NET, que después fue aprobado como un estándar por la ECMA (ECMA-334) e ISO (ISO/IEC 23270). C# es uno de los lenguajes de programación diseñados para la infraestructura de lenguaje común.", puntuacion: 2},
                    {nombre: "JavaScript", descripcion: "JavaScript (abreviado comúnmente JS) es un lenguaje de programación interpretado, dialecto del estándar ECMAScript. Se define como orientado a objetos,3 basado en prototipos, imperativo, débilmente tipado y dinámico.", puntuacion: 3},
                    {nombre: "Haskell", descripcion: "Haskell (pronunciado /hæskəl/)1 es un lenguaje de programación estandarizado multi-propósito puramente funcional con semánticas no estrictas y fuerte tipificación estática. Su nombre se debe al lógico estadounidense Haskell Curry. En Haskell, 'una función es un ciudadano de primera clase' del lenguaje de programación. Como lenguaje de programación funcional, el constructor de controles primario es la función. El lenguaje tiene sus orígenes en las observaciones de Haskell Curry y sus descendientes intelectuales.", puntuacion: 1}
                ];
                }
                
                $rootScope.usuarioRegistrado = $cookies.get('usuario');

                $rootScope.salir = function () {
                    $cookies.remove('usuario');
                    $rootScope.usuarioRegistrado = undefined;
                    console.log('hey');
                };

            }])
        .controller('mainController', ['$scope', '$rootScope', '$location', '$timeout', '$cookies',
            function ($scope, $rootScope, $location, $timeout, $cookies) {

                $scope.ruta = $location.path();
                $rootScope.rutas = $location.path().split('/');
                $rootScope.rutas.splice(0, 1);
                $scope.id = $location.search().id;

                if ($location.path() === '/lenguajes') {
                    $('.loader-inner').show();
                    $("#overlay").show();
                    $scope.loader = false;
                    $timeout(function () {
                        $('.loader-inner').hide();
                        $("#overlay").hide();
                        $scope.loader = true;
                    }, 2000);
                }

                if ($location.path() === '/lenguajes/nuevo') {
                    $scope.lenguaje = {puntuacion: 0};
                }

                if ($location.path() === '/lenguajes/editar') {
                    $scope.lenguaje = angular.copy($rootScope.lenguajes[$scope.id]);
                }

                $scope.nuevoLenguaje = function () {
                    $rootScope.lenguajes.push($scope.lenguaje);
                    $cookies.putObject('lenguajes', $rootScope.lenguajes);
                    $location.path('/lenguajes');
                };

                $scope.reset = function () {
                    $scope.lenguaje = angular.copy($rootScope.lenguajes[$scope.id]);
                };

                $scope.editarLenguaje = function () {
                    $rootScope.lenguajes[$scope.id] = angular.copy($scope.lenguaje);
                    $cookies.putObject('lenguajes', $rootScope.lenguajes);
                    $('.alert').show();
                    $timeout(function(){
                        $location.path('/lenguajes');
                    }, 2000);
                };

                $scope.mostrarEliminar = function (index, nombre) {
                    $scope.seleccionado = {id: index, nombre: nombre};
                    $('.alert').show();
                };

                $scope.ocultarEliminar = function () {
                    $scope.seleccionado = null;
                    $('.alert').hide();
                };

                $scope.eliminar = function (index) {
                    console.log(index);
                    index = index || $scope.seleccionado.id;
                    $rootScope.lenguajes.splice(index, 1);
                    $cookies.putObject('lenguajes', $rootScope.lenguajes);
                    $scope.ocultarEliminar();
                };

                $scope.sube = function (index) {
                    if (index) {
                        $rootScope.lenguajes[index].puntuacion++;
                        $cookies.putObject('lenguajes', $rootScope.lenguajes);
                        $location.path('/ranking');
                    }
                };

                $scope.baja = function (index) {
                    if (index) {
                        $rootScope.lenguajes[index].puntuacion = $rootScope.lenguajes[index].puntuacion - 1;
                        $cookies.putObject('lenguajes', $rootScope.lenguajes);
                        $location.path('/ranking');
                    }
                };

                $scope.registro = function () {
                    $rootScope.usuarioRegistrado = angular.copy($scope.usuario);
                    $cookies.put('usuario', $rootScope.usuarioRegistrado);
                    console.log($rootScope.usuario);
                };
            }]);
