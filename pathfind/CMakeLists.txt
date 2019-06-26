cmake_minimum_required(VERSION 3.10)
project(pathfind)

find_package(cxxopts)

file(GLOB SOURCES src/*.cpp)
add_executable(${PROJECT_NAME} ${SOURCES})
target_include_directories(${PROJECT_NAME} PRIVATE include)
target_link_libraries(${PROJECT_NAME} PRIVATE cxxopts::cxxopts)
