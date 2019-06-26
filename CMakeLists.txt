cmake_minimum_required(VERSION 3.0.0)
project(screeps)

# Download automatically, you can also just copy the conan.cmake file
if(NOT EXISTS "${CMAKE_BINARY_DIR}/conan.cmake")
    message(STATUS "Downloading conan.cmake from https://github.com/conan-io/cmake-conan")
    file(
       DOWNLOAD "https://raw.githubusercontent.com/conan-io/cmake-conan/master/conan.cmake"
      "${CMAKE_BINARY_DIR}/conan.cmake"
   )
endif()

include(${CMAKE_BINARY_DIR}/conan.cmake)
conan_cmake_run(
    PROFILE ${CMAKE_CURRENT_SOURCE_DIR}/emscripten.profile
    BUILD missing
)

include(${CMAKE_CURRENT_BINARY_DIR}/conanbuildinfo.cmake)
conan_basic_setup()

add_library(${PROJECT_NAME} iterate.cpp)

target_include_directories(${PROJECT_NAME}
    PRIVATE ${CONAN_INCLUDE_DIRS}
)
target_link_libraries(${PROJECT_NAME} PRIVATE ${CONAN_LIBS})

install(TARGETS ${PROJECT_NAME}
  RUNTIME DESTINATION bin
  LIBRARY DESTINATION lib
  ARCHIVE DESTINATION lib)
  
install(FILES
  ${CMAKE_RUNTIME_OUTPUT_DIRECTORY}/${PROJECT_NAME}.wasm
  DESTINATION bin)
