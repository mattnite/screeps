cmake_minimum_required(VERSION 3.10)
project(pathfind)

file(GLOB SOURCES src/*.cpp)

add_executable(${PROJECT_NAME} ${SOURCES})
target_include_directories(${PROJECT_NAME} PRIVATE include)
target_link_libraries(${PROJECT_NAME} PRIVATE stdc++fs)
target_compile_features(${PROJECT_NAME} PRIVATE cxx_std_17)
